import random
import time

# represents watt hours
meter_energy = 0.0
# represents watt
meter_power = 0

while True:
    # get power reading
    meter_power = random.randint(0, 500)
    # calculate energy for 1s power reading
    meter_energy += (meter_power / 1200)
    
    print(round(meter_energy,2))
    time.sleep(1)
