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

ActiveRecord::Schema.define(version: 2025_01_12_074640) do

  create_table "players", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.boolean "guest", default: false, null: false
    t.integer "blood_pool", default: 5000
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["username"], name: "index_players_on_username", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token"
    t.integer "player_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_sessions_on_player_id"
    t.index ["token"], name: "index_sessions_on_token", unique: true
  end

  add_foreign_key "sessions", "players"
end
