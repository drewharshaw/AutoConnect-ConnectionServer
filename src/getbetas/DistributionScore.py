####################################
# File: DistributionScore.py
# Author: AutoConnect Team
# Format Guid: This file follows PEP-8 style guid https://www.python.org/dev/peps/pep-0008/
# ----- BACKGROUND -----
# The Distribution function evalutates the beta vehicles position relative to surrounding
# candidates, and appropriatly implements k-means to cluster the betas.
####################################

#import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf




def k_means(clsuters_n):
  points_n = 20
  clusters_n = 4 # equal to beta bound
  iteration_n = 100


  

  print(np.random.uniform(0, 10, (points_n, 2)))

  points = tf.constant(np.random.uniform(0, 10, (points_n, 2)))

  # randomly select startign centroids from points list
  centroids = tf.Variable(tf.slice(tf.random_shuffle(points), [0, 0], [clusters_n, -1]))

  # expand dimension allowing element-wise subtraction
  points_expanded = tf.expand_dims(points, 0)
  centroids_expanded = tf.expand_dims(centroids, 1)

  # calculate distances & determine cluster assignments
  distances = tf.reduce_sum(tf.square(tf.subtract(points_expanded, centroids_expanded)), 2)
  assignments = tf.argmin(distances, 0)

  # compare 
  means = []
  for c in range(clusters_n):
      means.append(tf.reduce_mean(
        tf.gather(points, 
                  tf.reshape(
                    tf.where(
                      tf.equal(assignments, c)
                    ),[1,-1])
                ),reduction_indices=[1]))

  new_centroids = tf.concat(means, 0)
  update_centroids = tf.assign(centroids, new_centroids)

  # plotting results

  '''
  init = tf.global_variables_initializer()

  with tf.Session() as sess:
    sess.run(init)
    for step in range(iteration_n):
      [_, centroid_values, points_values, assignment_values] = sess.run([update_centroids, centroids, points, assignments])
      
    print("centroids", centroid_values)

  plt.scatter(points_values[:, 0], points_values[:, 1], c=assignment_values, s=50, alpha=0.5)
  plt.plot(centroid_values[:, 0], centroid_values[:, 1], 'kx', markersize=15)
  plt.show()
  '''