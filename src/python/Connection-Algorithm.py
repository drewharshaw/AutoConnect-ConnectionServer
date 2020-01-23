# Connection-Algorithm
# Description: Used to determin ideal Beta cars a given Alpha car should connect to
import sys
import node
import json


if __name__ == "__main__":
    node.log('Shell Started')
    node.ready()
    
    while (True):
        output = {}
        data = node.receive()
        output['ans'] = data * 4
        node.log(f"Data Processed: {data * 4}")
        node.emit(output)
        node.ready()
        sys.stdout.flush()







