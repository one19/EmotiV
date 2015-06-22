class SnippetsController < ApplicationController
  before_action :check_if_admin, :except => [:index, :show]

  def index
    @snippets = Snippet.all
    respond_to do |format|
      format.html {} # default: show the associated view
      format.json { render :json => @snippets }
    end
  end

  def show
    @snippet = Snippet.find(params[:id])
  end

  def new
    @snippet = Snippet.new
  end

  def edit
    @snippet = Snippet.find(params[:id])
  end

  def create
    @snippet = Snippet.new(snippet_params)

    respond_to do |format|
      if @snippet.save
        format.html { redirect_to @snippet, notice: 'Snippet was successfully created.' }
        format.json { render :show, status: :created, location: @snippet }
      else
        format.html { render :new }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      if @snippet.update(snippet_params)
        format.html { redirect_to @snippet, notice: 'Snippet was successfully updated.' }
        format.json { render :show, status: :ok, location: @snippet }
      else
        format.html { render :edit }
        format.json { render json: @snippet.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    snippet = Snippet.find(params[:id])
    snippet.destroy
    respond_to do |format|
      format.html { redirect_to snippets_url, notice: 'Snippet was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private
    def check_if_admin
      redirect_to root_path unless @current_user.present? & @current_user.admin?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def snippet_params
      params.require(:snippet).permit(:inbound, :contact_id, :context, :date)
    end
end
