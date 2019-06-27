module ErrorSerializer

  def self.active_record_serialize(errors, error_code, id, message=nil)
    return if errors.nil?
    json = {}
    if message == nil
      new_hash = { id: id, code: error_code, title: errors } 
    else
      new_hash = { id: id, code: error_code, title: message } 
    end

    json[:errors] = [new_hash]
    p json
    json
  end

  def self.serialize(errors)
    return if errors.nil?
    json = {}
    new_hash = errors.map do |k, v|
      v.map do |msg|
        { id: k, title: msg }
      end
    end.flatten
    json[:errors] = new_hash
    p json
    json
  end

end
