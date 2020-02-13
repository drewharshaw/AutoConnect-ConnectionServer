####################################
# File: Connection-Algorithm.py
# Author: AutoConnect Team
# Format Guid: This file follows PEP-8 style guid https://www.python.org/dev/peps/pep-0008/
# ----- BACKGROUND -----
# The Connection Algorithm is responsible for returning the Priority Matrix for a given
# getbetas GET request. The Prioirity Matrix is a priority list of the most ideal beta
# vehicles to connect to.
####################################

import sys
import node
import json
import random

from SightInterestScore import sight_interest_score


# ----- BACKGROUND -----
# Predicted connection duration measures in seconds how long a connection
# is predicted to last between 2 vehicles. The importance of this score stems
# from the temporarily time lost when reconnecting, therefore the frequency of
# of Beta reconnections should be minimized. The PCD score will depend on current
# and future locations, sights area and trajectory and path information.
# ----- FUNCTION BEHAVIOUR -----
# This function will calculate a 
#def predicted_connection_duration_score():


# ----- BACKGROUND -----
# Since predictions are being made, as time passess, the predictions become
# of less value. This time series uncertainty score will account for this and
# modify the 
#def time_series_uncertainty_score():


if __name__ == "__main__":

    input_data = node.receive()
    output = {}
    output['PriorityMatrix'] = []

    beta_list = input_data['BetaList']
    alpha_vehicle = input_data['AlphaVehicle']
    
    # Perform Sight Interest Calculations
    #beta_IS_scores = sight_interest_score(beta_list)

    # think about BetaBound

    # fixed at 0-3
    if len(beta_list) == 1:
        output['PriorityMatrix'].append(beta_list[0]['AutoId'])
    elif len(beta_list) == 2:
        output['PriorityMatrix'].append(beta_list[0]['AutoId'])
        output['PriorityMatrix'].append(beta_list[1]['AutoId'])
    elif len(beta_list) == 3:
        output['PriorityMatrix'].append(beta_list[0]['AutoId'])
        output['PriorityMatrix'].append(beta_list[1]['AutoId'])
        output['PriorityMatrix'].append(beta_list[2]['AutoId'])

    '''
        for i in range(alpha_vehicle['BetaBound']):
            rand_int = random.randrange(len(beta_list)-1)
            output['PriorityMatrix'].append(beta_list[rand_int]['AutoId'])
    '''

    output['Status'] = 'Success'
    node.emit(output)


    #force python to output buffer to terminal
    #sys.stdout.flush()
