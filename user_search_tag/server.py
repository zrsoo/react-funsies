from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for local React dev (localhost)

# Sample users
USERS = [
  {
    "id": 1,
    "name": "Jane Smith"
  },
  {
    "id": 2,
    "name": "Taylor Taylor"
  },
  {
    "id": 3,
    "name": "Chris Brown"
  },
  {
    "id": 4,
    "name": "Jane Young"
  },
  {
    "id": 5,
    "name": "Jane King"
  },
  {
    "id": 6,
    "name": "Morgan Smith"
  },
  {
    "id": 7,
    "name": "John Johnson"
  },
  {
    "id": 8,
    "name": "Chris Taylor"
  },
  {
    "id": 9,
    "name": "Drew King"
  },
  {
    "id": 10,
    "name": "John Young"
  },
  {
    "id": 11,
    "name": "Chris Young"
  },
  {
    "id": 12,
    "name": "Morgan Taylor"
  },
  {
    "id": 13,
    "name": "Casey King"
  },
  {
    "id": 14,
    "name": "Taylor Smith"
  },
  {
    "id": 15,
    "name": "Alex Hall"
  },
  {
    "id": 16,
    "name": "Jordan Lee"
  },
  {
    "id": 17,
    "name": "Alex Taylor"
  },
  {
    "id": 18,
    "name": "Jordan Johnson"
  },
  {
    "id": 19,
    "name": "Jane Hall"
  },
  {
    "id": 20,
    "name": "Jane Walker"
  },
  {
    "id": 21,
    "name": "Jordan King"
  },
  {
    "id": 22,
    "name": "Casey Young"
  },
  {
    "id": 23,
    "name": "Taylor King"
  },
  {
    "id": 24,
    "name": "Chris Johnson"
  },
  {
    "id": 25,
    "name": "John Taylor"
  },
  {
    "id": 26,
    "name": "Taylor Johnson"
  },
  {
    "id": 27,
    "name": "Morgan Lee"
  },
  {
    "id": 28,
    "name": "Casey Walker"
  },
  {
    "id": 29,
    "name": "Alex Walker"
  },
  {
    "id": 30,
    "name": "Jordan Taylor"
  },
  {
    "id": 31,
    "name": "Sam Brown"
  },
  {
    "id": 32,
    "name": "Drew Taylor"
  },
  {
    "id": 33,
    "name": "Alex Allen"
  },
  {
    "id": 34,
    "name": "Jordan Smith"
  },
  {
    "id": 35,
    "name": "Chris Smith"
  },
  {
    "id": 36,
    "name": "Jordan Hall"
  },
  {
    "id": 37,
    "name": "Chris King"
  },
  {
    "id": 38,
    "name": "Casey Hall"
  },
  {
    "id": 39,
    "name": "Casey Brown"
  },
  {
    "id": 40,
    "name": "Taylor Brown"
  },
  {
    "id": 41,
    "name": "Drew Lee"
  },
  {
    "id": 42,
    "name": "Sam Hall"
  },
  {
    "id": 43,
    "name": "Alex Young"
  },
  {
    "id": 44,
    "name": "Casey Johnson"
  },
  {
    "id": 45,
    "name": "Alex Brown"
  },
  {
    "id": 46,
    "name": "Morgan King"
  },
  {
    "id": 47,
    "name": "Taylor Young"
  },
  {
    "id": 48,
    "name": "Taylor Hall"
  },
  {
    "id": 49,
    "name": "John Lee"
  },
  {
    "id": 50,
    "name": "Drew Brown"
  },
  {
    "id": 51,
    "name": "Drew Johnson"
  },
  {
    "id": 52,
    "name": "Sam Taylor"
  },
  {
    "id": 53,
    "name": "Drew Smith"
  },
  {
    "id": 54,
    "name": "Sam Walker"
  },
  {
    "id": 55,
    "name": "Casey Smith"
  },
  {
    "id": 56,
    "name": "Sam Johnson"
  },
  {
    "id": 57,
    "name": "Jane Allen"
  },
  {
    "id": 58,
    "name": "Alex Lee"
  },
  {
    "id": 59,
    "name": "Jordan Allen"
  },
  {
    "id": 60,
    "name": "Drew Allen"
  },
  {
    "id": 61,
    "name": "Jane Taylor"
  },
  {
    "id": 62,
    "name": "Sam Young"
  },
  {
    "id": 63,
    "name": "John Walker"
  },
  {
    "id": 64,
    "name": "Chris Lee"
  },
  {
    "id": 65,
    "name": "Casey Taylor"
  },
  {
    "id": 66,
    "name": "Sam King"
  },
  {
    "id": 67,
    "name": "Morgan Allen"
  },
  {
    "id": 68,
    "name": "John Hall"
  },
  {
    "id": 69,
    "name": "Morgan Brown"
  },
  {
    "id": 70,
    "name": "Taylor Allen"
  },
  {
    "id": 71,
    "name": "Casey Allen"
  },
  {
    "id": 72,
    "name": "Chris Hall"
  },
  {
    "id": 73,
    "name": "John Brown"
  },
  {
    "id": 74,
    "name": "Casey Lee"
  },
  {
    "id": 75,
    "name": "Morgan Young"
  },
  {
    "id": 76,
    "name": "John Smith"
  },
  {
    "id": 77,
    "name": "Sam Allen"
  },
  {
    "id": 78,
    "name": "Drew Young"
  },
  {
    "id": 79,
    "name": "Alex Smith"
  },
  {
    "id": 80,
    "name": "Alex Johnson"
  },
  {
    "id": 81,
    "name": "Sam Smith"
  },
  {
    "id": 82,
    "name": "Chris Walker"
  },
  {
    "id": 83,
    "name": "John Allen"
  },
  {
    "id": 84,
    "name": "Jane Johnson"
  },
  {
    "id": 85,
    "name": "Taylor Lee"
  },
  {
    "id": 86,
    "name": "Jordan Brown"
  },
  {
    "id": 87,
    "name": "Jane Brown"
  },
  {
    "id": 88,
    "name": "Jordan Young"
  },
  {
    "id": 89,
    "name": "Jane Lee"
  },
  {
    "id": 90,
    "name": "Alex King"
  },
  {
    "id": 91,
    "name": "Morgan Walker"
  },
  {
    "id": 92,
    "name": "Morgan Johnson"
  },
  {
    "id": 93,
    "name": "Morgan Hall"
  },
  {
    "id": 94,
    "name": "Sam Lee"
  },
  {
    "id": 95,
    "name": "Chris Allen"
  },
  {
    "id": 96,
    "name": "Jordan Walker"
  },
  {
    "id": 97,
    "name": "John King"
  },
  {
    "id": 98,
    "name": "Taylor Walker"
  },
  {
    "id": 99,
    "name": "Drew Walker"
  },
  {
    "id": 100,
    "name": "Drew Hall"
  }
]


@app.route("/search", methods=["GET"])
def search_users():
    query = request.args.get("name", "").strip().lower()
    if not query:
        return jsonify([])
    
    matches = [user for user in USERS if query in user["name"].lower()]
    return jsonify(matches)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
