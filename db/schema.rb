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

ActiveRecord::Schema.define(version: 2025_02_20_003249) do

  create_table "cards", force: :cascade do |t|
    t.string "name", null: false
    t.string "suit", null: false
    t.string "rank", null: false
    t.text "description", null: false
    t.string "effect", null: false
    t.string "effect_type", null: false
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

  create_table "player_tokens", force: :cascade do |t|
    t.integer "player_id"
    t.integer "token_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_player_tokens_on_player_id"
    t.index ["token_id"], name: "index_player_tokens_on_token_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest"
    t.boolean "guest", default: false, null: false
    t.boolean "tutorial_complete", default: false, null: false
    t.integer "blood_pool", default: 5000, null: false
    t.integer "highest_daimon_health", default: 0, null: false
    t.integer "highest_round", default: 0, null: false
    t.integer "lore_progression", default: 0, null: false
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

  create_table "slotted_tokens", force: :cascade do |t|
    t.integer "token_id"
    t.integer "token_slot_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["token_id", "token_slot_id"], name: "index_slotted_tokens_on_token_id_and_token_slot_id", unique: true
    t.index ["token_id"], name: "index_slotted_tokens_on_token_id"
    t.index ["token_slot_id"], name: "index_slotted_tokens_on_token_slot_id"
  end

  create_table "token_slots", force: :cascade do |t|
    t.string "slot_type", null: false
    t.integer "player_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_token_slots_on_player_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.string "name", null: false
    t.string "rune", null: false
    t.text "description", null: false
    t.string "effect_type", null: false
    t.text "inscribed_effect", null: false
    t.text "oathbound_effect", null: false
    t.text "offering_effect", null: false
    t.boolean "lore_token", default: false, null: false
    t.integer "sequence_order"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["effect_type"], name: "index_tokens_on_effect_type"
    t.index ["lore_token"], name: "index_tokens_on_lore_token"
    t.index ["sequence_order"], name: "index_tokens_on_sequence_order", unique: true, where: "lore_token = true"
  end

  add_foreign_key "cards_in_decks", "cards", on_delete: :cascade
  add_foreign_key "cards_in_decks", "decks", on_delete: :cascade
  add_foreign_key "collections", "cards", on_delete: :cascade
  add_foreign_key "collections", "players", on_delete: :cascade
  add_foreign_key "decks", "players", on_delete: :cascade
  add_foreign_key "player_tokens", "players", on_delete: :cascade
  add_foreign_key "player_tokens", "tokens", on_delete: :cascade
  add_foreign_key "sessions", "players", on_delete: :cascade
  add_foreign_key "slotted_tokens", "token_slots", on_delete: :cascade
  add_foreign_key "slotted_tokens", "tokens", on_delete: :cascade
  add_foreign_key "token_slots", "players", on_delete: :cascade
end
