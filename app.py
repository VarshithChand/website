from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        project = request.form.get("project")
        message = request.form.get("message")

        print("\n--- New Contact Message ---")
        print("Name:", name)
        print("Email:", email)
        print("Project:", project)
        print("Message:", message)
        print("--------------------------\n")

        return redirect(url_for("home"))

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
