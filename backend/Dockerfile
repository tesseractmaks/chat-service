FROM python:3.11

RUN mkdir "app"

WORKDIR /app

COPY requirements.txt requirements.txt

RUN python -m pip install --upgrade pip && pip install -r requirements.txt

COPY . ./

CMD ["hypercorn", "main:app", "--bind", "0.0.0.0:8000", "--reload"]







