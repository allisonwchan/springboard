from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def add_nums():
    """Return a + b using operations.py function add."""

    a, b = int(request.args.get("a")), int(request.args.get("b"))
    html = f"<html><body><h1>{add(a,b)}</h1></body></html>"
    return html

@app.route('/sub')
def sub_nums():
    """Return a - b using operations.py function sub."""

    a, b = int(request.args.get("a")), int(request.args.get("b"))
    html = f"<html><body><h1>{sub(a,b)}</h1></body></html>"
    return html

@app.route('/mult')
def mult_nums():
    """Return a * b using operations.py function mult."""

    a, b = int(request.args.get("a")), int(request.args.get("b"))
    html = f"<html><body><h1>{mult(a,b)}</h1></body></html>"
    return html

@app.route('/div')
def div_nums():
    """Return a / b using operations.py function div."""

    a, b = int(request.args.get("a")), int(request.args.get("b"))
    html = f"<html><body><h1>{div(a,b)}</h1></body></html>"
    return html

#############################################################################

oper_dict = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div
}

# Using one route to accomplish the above
@app.route('/math/<oper>')
def do_math(oper):
    """Execute a function from operations.py depending on URL."""

    a, b = int(request.args.get("a")), int(request.args.get("b"))
    op = oper_dict[oper]
    html = f"<html><body><h1>{op(a,b)}</h1></body></html>"
    return html