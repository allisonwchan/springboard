import os
import psycopg2

print(os.environ)

# conn = psycopg2.connect(
#     host="localhost",
#     database="users",
#     user=os.environ['DB_USERNAME'],
#     password=os.environ['DB_PASSWORD']
# )

# cur = conn.cursor()

# # create new table
# cur.execute('DROP TABLE IF EXISTS users;')
# cur.execute('CREATE TABLE users (id serial PRIMARY KEY,'
#             'first_name varchar(50) NOT NULL,'
#             'last_name varchar(50) NOT NULL,'
#             'image_url varchar(200) NOT NULL')

# conn.commit()

# cur.close()
# conn.close()