# This file contains helper functions for communicating information between node and python

import sys
import json


def log(*args, **vargs):
    print(*args, file=sys.stderr, **vargs)

def receive():
    try:
        incoming = input()
        return json.loads(incoming)
    except EOFError:
        return
    
    


def emit(data):
    print(json.dumps(data))