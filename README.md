# Trek

A prototype for a training management platform. (Exercise for creating web applications.)

## Logo

<img src="images/logo.png" alt="Logo" width="90"/> &nbsp;&nbsp;&nbsp;
<img src="images/icon.png" alt="Icon" width="80"/>

Arrow up "progress"
and the letter the "T" for "Trek" or "Tracking"

- Figma: <https://www.figma.com/design/8uj17xCKdOpIE9AFyEs9wL/Trek?node-id=0-1&t=IgD0GrY15Xuw54Go-1>

## Backend

- Python Django REST Framework
- Postgre Database

## Frontend

- NextJS (web version)

## Reminders

- requirments.txt has more libraries then the app currently uses (clean up needed)

- <https://www.django-rest-framework.org/tutorial/2-requests-and-responses/>
- in /backend... source venv/bin/activate (deactivate)
- in /trackapi... python manage.py runserver
- migrations when models are updated
- Note to myself: you may need recreate the the database in the beginning stages

### If database is empty

- python manage.py flush -> a new admin user needs to be added so that you can
- python manage.py createsuperuser
login to dashboard

- python manage.py makemigrations
- python manage.py migrate

---

## Security - ISSUES MOST LIKELY

Backend sends JWT http only cookies which uses for authorization of routes, but it still expects Bearer access_token in header of the request -> not sure if its a good idea or no, but it is what it is.

Frontend has a proxy that adds the bearer from the cookies into the headers when a request is fetched. On the browser they are stored as HTTP only, but mobile users have to be supported which why the Bearer is important. Not quite sure if its a good idea from a security standpoint, but I set it up like that for now.

## Making a Change

Backend: models -> serializers -> views -> urls
Frontend: page -> components -> proxy -> direct api call 

## Attention

Be careful with trailing / in the links, the urls in the backend expect /, but not on the frontend...


