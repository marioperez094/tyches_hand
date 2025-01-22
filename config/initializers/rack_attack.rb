class Rack::Attack
  # Throttle requests to /api/players#create_guest by IP:
  throttle('create_guest', limit: 5, period: 60.seconds) do |req|
    if req.path == '/api/players/guest' && req.post?
      req.ip
    end
  end
end