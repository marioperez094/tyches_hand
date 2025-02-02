# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2025_01_14_162913) do

  create_table "cards", force: :cascade do |t|
    t.string "name", null: false
    t.string "suit", null: false
    t.string "rank", null: false
    t.string "description", null: false
    t.string "effect", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["effect"], name: "index_cards_on_effect"
    t.index ["rank"], name: "index_cards_on_rank"
    t.index ["suit"], name: "index_cards_on_suit"
  end

  create_table "cards_in_decks", force: :cascade do |t|
    t.integer "card_id"
    t.integer "deck_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["card_id", "deck_id"], name: "index_cards_in_decks_on_card_id_and_deck_id", unique: true
    t.index ["card_id"], name: "index_cards_in_decks_on_card_id"
    t.index ["deck_id"], name: "index_cards_in_decks_on_deck_id"
  end

  create_table "collections", force: :cascade do |t|
    t.integer "player_id"
    t.integer "card_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["card_id"], name: "index_collections_on_card_id"
    t.index ["player_id", "card_id"], name: "index_collections_on_player_id_and_card_id", unique: true
    t.index ["player_id"], name: "index_collections_on_player_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string "name", null: false
    t.integer "player_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_decks_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest"
    t.boolean "guest", default: false, null: false
    t.boolean "tutorial_complete", default: false, null: false
    t.integer "blood_pool", default: 5000, null: false
    t.integer "high_score", default: 0, null: false
    t.integer "high_score_round", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["username"], name: "index_players_on_username", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token", null: false
    t.integer "player_id", null: false
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_sessions_on_player_id"
    t.index ["token"], name: "index_sessions_on_token", unique: true
  end

  add_foreign_key "cards_in_decks", "cards"
  add_foreign_key "cards_in_decks", "decks"
  add_foreign_key "collections", "cards"
  add_foreign_key "collections", "players"
  add_foreign_key "decks", "players"
  add_foreign_key "sessions", "players"
end
