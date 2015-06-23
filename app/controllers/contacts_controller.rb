class ContactsController < ApplicationController
  before_action :check_if_admin, :except => [:index, :show, :create, :upload]

  def index
    @contacts = Contact.all
    respond_to do |format|
      format.html {} # default: show the associated view
      format.json { render :json => @contacts }
    end
  end

  def show
    @contact = Contact.find(params[:id])
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
    @contact = Contact.find(params[:id])
  end

  def create
    @contact = Contact.new(contact_params)

    respond_to do |format|
      if @contact.save
        format.html { redirect_to @contact, notice: 'Contact was successfully created.' }
        format.json { render :show, status: :created, location: @contact }
      else
        format.html { render :new }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @contact = Contact.find(params[:id])
    respond_to do |format|
      if @contact.update(contact_params)
        format.html { redirect_to @contact, notice: 'Contact was successfully updated.' }
        format.json { render :show, status: :ok, location: @contact }
      else
        format.html { render :edit }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    respond_to do |format|
      format.html { redirect_to contacts_url, notice: 'Contact was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upload
    # XML file uploaded to server is opened and then navigated down to the array of all sms objects
    @xml_array = Crack::XML.parse(open(params[:xml].tempfile).read)['smses']['sms']


    # Potentially will need to sort through array and take both name and content from the xml
    # so that we can save the name into the database and run the content through the sentiment
    # api and then store data.

    # create array for all unique contact names to be pushed into
    @xml_names = []
    # iterate through array of smses to get all unique contact names
    @xml_array.each do |sms|
      info = sms['contact_name']
      @xml_names << info
      @xml_names.uniq!
    end

    # array of the users current contacts prior to mobile contacts being added.
    # Can use to ensure we don't double up on contacts although you can email
    # and sms the same person so probably not necessary. will delete in future
    id = @current_user.id
    @users_contacts = Contact.where("user_id = #{id}")
    # create a new contact for each entry in @xml_names
    @xml_names.each do |contact|
      new_contact = Contact.new
      new_contact.name = contact
      new_contact.user_id = @current_user.id
      new_contact.save
    end

    # destroy xml.temp data afterwards
    # @xml_array.destroy
    redirect_to root_path
  end


  private

    def check_if_admin
      redirect_to root_path unless @current_user.present? & @current_user.admin?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      params.require(:contact).permit(:name, :email_address, :user_id, :weekFeel, :currentFeel, :highFeel, :lowFeel)
    end
end
