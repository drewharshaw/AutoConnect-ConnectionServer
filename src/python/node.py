# This file contains helper functions for communicating information between node and python

import sys
import json


def ready():
    emit({
        'status': 'ready'
    })

def log(*args, **vargs):
    print(*args, file=sys.stderr, **vargs)

def receive():
    incoming = input()
    return json.loads(incoming)


def emit(data):
    print(json.dumps(data))