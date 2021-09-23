class PostSerializer < ActiveModel::Serializer
  attributes :title, :description

  def initializer(object, **option) 
    super
    @is_id = option[:id]
  end

  attribute :id, if: -> { @is_id }
end
