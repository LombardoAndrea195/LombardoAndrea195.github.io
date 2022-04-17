import logging
import datetime
import sys
import os
#for importing it-> import logger_code from caller
#for calling it-> log=logger_code.logger()
#log.info("content")
repositoryname = datetime.datetime.now().strftime("%d-%m-%Y")  # Setting the filename from current date and time

if not os.path.exists(repositoryname):
    os.makedirs(repositoryname)

filename = datetime.datetime.now().strftime("%d-%m-%Y %H-%M-%S")  # Setting the filename from current date and time
logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s | %(levelname)s | %(message)s')
stdout_handler = logging.StreamHandler(sys.stdout)
stdout_handler.setLevel(logging.DEBUG)
stdout_handler.setFormatter(formatter)
file_handler = logging.FileHandler('{}/{}.log'.format(repositoryname,filename))

file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)

file_handler.setLevel(logging.ERROR)
file_handler.setFormatter(formatter)

file_handler.setLevel(logging.FATAL)
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(stdout_handler)
