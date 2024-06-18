PYTHON_VERSION := 3.11

VENV ?= .venv

.create-venv:
	test -d $(VENV) || python$(PYTHON_VERSION) -m venv $(VENV)
	$(VENV)/Scripts/python -m pip install --upgrade pip
	$(VENV)/Scripts/python -m pip install "poetry<1.6.0"

install:
	venv/Scripts/poetry install --only main,dev

init: .create-venv install

black-lint:
	$(VENV)/Scripts/black --check .

flake8:
	$(VENV)/Scripts/flake8 --statistics --show-source .

pretty:
	$(VENV)/Scripts/isort .
	$(VENV)/Scripts/black .

plint: pretty lint

lint:  black-lint flake8

lock:
	$(VENV)/Scripts/poetry lock

create-tables:
	YDB_ANONYMOUS_CREDENTIALS=1 $(VENV)/Scripts/python db/create_tables.py -e grpc://localhost:2136 -d local

local-api-up:
	YDB_ANONYMOUS_CREDENTIALS=1 PYTHONPATH=. venv/Scripts/python src/api.py
