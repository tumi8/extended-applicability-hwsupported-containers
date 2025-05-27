# read all files 

import os
import sys

path_in = sys.argv[1]

for root, dirs, files in os.walk(path_in):
    print("---" + root)
    for file in files:
        # rename .csv to .svg 
        if ".csv" in file:
            new_name = file.replace(".csv", ".svg")
            print(new_name)
            os.rename(os.path.join(root, file), os.path.join(root, new_name))
    # for index, file in enumerate(files):
    #     if "hdr-histogram-latencies" in file:
    #         new_name = f"hdr-histogram-latencies-repeat-{index}.csv"
    #         print(new_name)
    #         os.rename(os.path.join(root, file), os.path.join(root, new_name))
    #     elif "worstof-timeseries-latencies" in file:
    #         new_name = f"worstof-timeseries-latencies-repeat-{index-3}.csv"
    #         os.rename(os.path.join(root, file), os.path.join(root, new_name))