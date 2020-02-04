# Connection-Algorithm
# Description: Used to determin ideal Beta cars a given Alpha car should connect to
# This python code will follow PEP-8 standards
import sys
import node
import json



if __name__ == "__main__":

    num = 0
    output = {}
    data = node.receive()

    BetaList = data['BetaList']
    AlphaVehicle = data['AlphaVehicle']
    


    # Perform Sight Interest Calculations





    # debugging print node.log(data)

    output['Status'] = 'Success'
    output['PriorityMatrix'] = [2,3] #[data['0']['AutoId'], data['1']['AutoId']]

    node.emit(output)
    # force python to output buffer to terminal
    #sys.stdout.flush()


# ----- BACKGROUND -----
# Sight Interest score is a metric for measuring the value of area a
# specific vehicle is covering. It is important for vehicles have connections
# to vehicles that have sight of high likelihood areas of potential hazardous
# objects. For each geographical area a predictive heatmap has been preprocessed
# denoting probability scores for each bin. See python file SightInterestScore for 
# further details. 
# ----- FUNCTION BEHAVIOUR -----
# This function will apply the heatmap to the sight area of each vehicle
# calculating their individual SI score.
#def sight_interest_score(alpha):


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




# ----- FUNCTION BEHAVIOUR -----
# This function queries the 
#def find_closest_betas():


    





