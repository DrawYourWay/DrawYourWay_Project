FROM python:3.13

COPY . /backend

WORKDIR /backend

RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /backend/src

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]