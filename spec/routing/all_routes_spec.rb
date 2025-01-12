require 'rails_helper'

RSpec.describe 'Route definition', :type => :routing do
  it 'of POST /players' do
    expect(:post => '/api/players').to route_to(:controller => 'api/players', :action => 'create')
  end
  
  it 'of GET /players' do
    expect(:get => '/api/players').to route_to(:controller => 'api/players', :action => 'index')
  end

  it 'of GET /players' do
    expect(:get => '/api/players/:id').to route_to(:controller => 'api/players', :action => 'show', :id => ':id')
  end

  it 'of PUT guest /players/:id' do
    expect(:put => '/api/players/:id/convert_to_registered').to route_to(:controller => 'api/players', :action => 'convert_to_registered', :id => ':id')
  end

  it 'of PUT password /players/:id' do
    expect(:put => '/api/players/:id/update_password').to route_to(:controller => 'api/players', :action => 'update_password', :id => ':id')
  end

  it 'of DELETE password /players/:id' do
    expect(:delete => '/api/players/:id').to route_to(:controller => 'api/players', :action => 'destroy', :id => ':id')
  end
end