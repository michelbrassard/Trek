# Trek

A prototype for a training management platform.
Also, it as exercise for creating web applications.

## Reminders

- Stao ovdje u tutorialu: <https://www.django-rest-framework.org/tutorial/2-requests-and-responses/>
- generate requirements.txt after its developed
- in /backend... source venv/bin/activate (deactivate)
- in /trackapi... python manage.py runserver
- migrations when models are updated
- Note to myself: you may need recreate the the database in the beginning stages

- if database is empty
- python manage.py flush -> a new admin user needs to be added so that you can
- python manage.py createsuperuser
login to dashboard

- python manage.py makemigrations
- python manage.py migrate

---

## Import Warnings

The  virtual environment from where the server runs has all the needed libraries, but the interpeter which vscode uses doesn(t).

## Security - ISSUES MOST LIKELY

Backend sends JWT http only cookies which uses for authorization of routes, but it still expects Bearer access_token in header of the request -> not sure if its a good idea or no, but it is what it is.

Frontend has a proxy that adds the bearer from the cookies into the headers when a request is fetched. On the browser they are stored as HTTP only, but mobile users have to be supported which why the Bearer is important. Not quite sure if its a good idea from a security standpoint, but I set it up like that for now.

## Organizing

Models, views and other files can be separated into multiple files saved into the folder, but use the init.py so that it recognizes what to import
