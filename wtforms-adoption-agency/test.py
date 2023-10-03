from app import app
from unittest import TestCase

app.config['WTF_CSRF_ENABLED'] = False

class PetTestFormsCase(TestCase):
    """Test routes."""

    def test_homepage(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h1>Pets</h1>", html)


    def test_add_form(self):
        with app.test_client() as client:
            resp = client.get('/add', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<div class='form-group'", html)

    def test_edit_form(self):
        with app.test_client() as client:
            id = 1
            resp = client.get(f"/{id}/edit", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<div class='form-group'", html)


class PetTestDataCase(TestCase):
    """Check that data is being collected correctly from forms."""

    def test_add_pet(self):
        with app.test_client() as client:
            d = {"name": "chonker", "species": "dog"}
            name = d["name"]
            resp = client.post("/add", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f"", html)