class Api::V1::RecordsController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_record, only: [:show, :update, :destroy]

  # GET /api/v1/records
  def index
    @records = current_user.records.all

    render json: @records
  end

  # GET /api/v1/records/1
  def show
    render json: @record
  end

  # POST /api/v1/records
  def create
    @record = current_user.records.build(record_params)

    unless @record.save
      return render json: @record.errors, status: :unprocessable_entity
    end

    render json: @record, status: :created, location: @record
  end

  # PATCH/PUT /api/v1/records/1
  def update
    unless @record.update(record_params)
      return render json: @record.errors, status: :unprocessable_entity
    end

    render json: @record
  end

  # DELETE /api/v1/records/1
  def destroy
    @record.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_record
      @record = current_user.records.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def record_params
      params.require(:record).permit(:title, :year, :artist_id)
    end
end
