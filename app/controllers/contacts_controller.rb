class ContactsController < ApplicationController
  before_action :check_if_admin, :except => [:index, :show, :create, :upload, :update]

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
        # format.json { render :show, status: :created, location: @contact }
        format.json { render :json => @contact  }
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

    # Creates an array of snippets to be sent to API
    @snippets_to_send = []
    # Creates array of contact objects which we will put in DB afterwards
    @xml_obj_array = []
    # From each sms we create an obj with the contact name from the SMS and an empty key
    # where we will store snippet stats after the API request. 
    # All snippets will be placed in another array to send to API.
    @xml_array.each do |sms|
      obj = {
        name: sms['contact_name'],
        snippet_stats: nil
      }
      @xml_obj_array << obj
      content = sms['body']
      @snippets_to_send << content
    end

    # Array containing all snippet stats after being sent through method
    @snip_stats = analyse_snippet @snippets_to_send
    
    # Put them back into @xml_obj_array for no reason in particular. maybe it is pretty
    @snip_stats.length.times do |i|
      @xml_obj_array[i][:snippet_stats] = @snip_stats[i]
    end

    # create array for all unique contact names to be pushed into
    @xml_names = []
    # iterate through array of smses to get all unique contact names
    @xml_array.each do |sms|
      info_name = sms['contact_name']
      @xml_names << info_name
      @xml_names.uniq!
    end

    # create a new contact for each entry in @xml_names
    @xml_names.each do |contact|
      new_contact = Contact.new
      new_contact.name = contact + ' SMS'
      new_contact.user_id = @current_user.id
      new_contact.save
    end

    @xml_array.each_with_index do |sms, ind|
      snip = Snippet.new
      inbound = @xml_array[ind]['type']
      snip.inbound = inbound == '1' ? true : false
      name = @xml_array[ind]['contact_name'] + ' SMS'
      snip.contact_id = Contact.where({ name: name })[0].id
      # snip.context = @xml_obj_array[ind][:snippet_stats]
      snip.context = @snip_stats[ind].to_json
      snip.date = @xml_array[ind]['readable_date']
      # binding.pry
      snip.save
    end

    # destroy xml.temp data afterwards
    @xml_array = nil
    @snippets_to_send = nil
    redirect_to root_path
  end


private

  def analyse_snippet snippet_batch
    # module which will allow us to post to our snippet data to the sentiment API
    url = "http://sentiment.vivekn.com/api/batch/"
    res = HTTParty.post( url, { :body => snippet_batch.to_json })
    res
  end

  def check_if_admin
    redirect_to root_path unless @current_user.present? & @current_user.admin?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def contact_params
    params.require(:contact).permit(:name, :email_address, :user_id, :weekFeel, :currentFeel, :highFeel, :lowFeel)
  end
end
