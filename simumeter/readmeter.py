import random
import time

# represents watt hours
meter_start_value = 0

while True:
    meter_start_value += random.randint(0, 100)
    print(meter_start_value)
    time.sleep(1)
