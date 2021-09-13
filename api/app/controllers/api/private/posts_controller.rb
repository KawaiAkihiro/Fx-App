module Api
  module Private
    class Api::Private::PostsController < ApplicationController
      before_action :set_post, only: [:show, :update, :destroy]

      def index
        posts = Post.order(created_at: :asc)
        # render json: { status: 'SUCCESS', message: 'fetched posts', data: posts }
        render json: posts, each_serializer: PostSerializer
      end

      def show
        render json: { status: 'SUCCESS', message: 'fetched a post', data: @post }
      end

      def create
        post = Post.new(post_params)
        if post.save
          render json: { status: 'SUCCESS', data: post }
        else
          render json: { status: 'ERROR', data: post.errors }
        end
      end

      def update
        if @post.update(post_params)
          render json: { status: 'SUCCESS', message: 'Updated the post', data: @post }
        else
          render json: { status: 'ERROR', message: 'not updated', data: @post.data }
        end
      end

      def destroy
        @post.destroy
        render json: { status: 'SUCCESS', message: 'deleted the post', data: @post }
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.require(:post).permit(:title, :description)
      end
    end
  end
end
