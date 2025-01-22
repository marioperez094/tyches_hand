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
  
  it 'of GET /players with cards' do
    expect(:get => '/api/players/:id?cards=true').to route_to(:controller => 'api/players', :action => 'show', :id => ':id', :cards => 'true')
  end

  it 'of PUT guest /players/:id' do
    expect(:put => '/api/players/:id/convert_to_registered').to route_to(:controller => 'api/players', :action => 'convert_to_registered', :id => ':id')
  end

  it 'of PUT password /players/:id' do
    expect(:put => '/api/players/update_password').to route_to(:controller => 'api/players', :action => 'update_password')
  end

  it 'of POST /players/cards/discover' do
    expect(:post => 'api/players/cards/discover').to route_to(:controller => 'api/players', :action => 'player_discover_cards')
  end

  it 'of DELETE password /players/:id' do
    expect(:delete => '/api/players/:id').to route_to(:controller => 'api/players', :action => 'destroy', :id => ':id')
  end

  it 'of POST /sessions' do
    expect(:post => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'create')
  end

  it 'of DELETE /sessions' do
    expect(:delete => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'destroy')
  end

  it 'of GET /authenticated' do
    expect(:get => '/api/authenticated').to route_to(:controller => 'api/sessions', :action => 'authenticated' )
  end

  it 'of GET /cards' do 
    expect(:get => '/api/cards/:id').to route_to(:controller => 'api/cards', :action => 'show', :id => ':id')
  end

  it 'of POST /decks' do 
    expect(:post => '/api/decks').to route_to(:controller => 'api/decks', :action => 'create')
  end

  it 'of PUT /decks/:id/rename' do
    expect(:put => '/api/decks/:id/rename').to route_to(:controller => 'api/decks', :action => 'rename_deck', :id => ':id')
  end

  it 'of PUT /decks/:id/cards/:card_removed/:card_added' do
    expect(:put => '/api/decks/:id/cards/:card_removed/:card_added').to route_to(:controller => 'api/decks', :action => 'swap_cards', :id => ':id', :card_removed => ':card_removed', :card_added => ':card_added')
  end
end