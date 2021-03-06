class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @users = User.page(params[:page]).per(25)
  end

  def show
    @user = User.friendly.find(params[:id])
    @songs = @user.songs.page(params[:page]).per(25)
  end

  def edit
    @user = User.friendly.find(params[:id])
  end

  def update
    @user = User.friendly.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to (@user), notice: t(:user_updated) }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user = User.friendly.find(params[:id])
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_path, notice: t(:user_deleted) }
      format.json { head :no_content }
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_image, :username)
  end
end
