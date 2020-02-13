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
# of less value. This time series uncertainty score 
#def time_series_uncertainty_score():


if __name__ == "__main__":

    num = 0
    output = {}
    data = node.receive()

    beta_list = data['BetaList']
    alpha_vehicle = data['AlphaVehicle']
    
    #beta_IS_scores = sight_interest_score(beta_list)

    # get random AutoId
    if (len(beta_list) not in [0,1]): 
        random_value = random.randrange(len(beta_list)-1)
        random_value2 = random.randrange(len(beta_list)-1)
        output['PriorityMatrix'] = [beta_list[random_value]['AutoId'], beta_list[random_value2]['AutoId']]
    
    if(len(beta_list) == 1):
        output['PriorityMatrix'] = [beta_list[0]['AutoId']]
    else:
        output['PriorityMatrix'] = []

    # Perform Sight Interest Calculations
    # debugging print node.log(data)

    output['Status'] = 'Success'
   
    #[data['0']['AutoId'], data['1']['AutoId']]

    node.emit(output)
    # force python to output buffer to terminal
    #sys.stdout.flush()
