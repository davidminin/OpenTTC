# The route short names that will be extracted from all of the data
routeNumbers = ['105', '504']
routes = []
trips = []

# First, find route ids based on route numbers and routes.txt
first = True

for line in open("routes.txt"):
	if(first):
		first = False
		continue

	vals = line.split(",")

	if(vals[2] in routeNumbers):
		print("matched " + vals[2] + " will append " + vals[0])
		routes.append(vals[0])

print("Extracted route ids: " + str(len(routes)))

# Second, isolate trips.txt based on routes
out = open('selected_trips.txt', 'w')
first = True

for line in open("trips.txt"):
	if(first):
		first = False
		out.write(line)
		continue

	vals = line.split(",")

	# 0: route_id, 1: service_id, 2: trip_id
	if(vals[0] in routes and int(vals[1]) == 3):
		trips.append(vals[2])
		out.write(line)

out.close()
print('Extracted trip ids: ' + str(len(trips)))

# Third, isolate stop_times.txt based on trips
out = open('selected_stop_times.txt', 'w')
first = True

for line in open("stop_times.txt"):
	if(first):
		first = False
		out.write(line)
		continue

	vals = line.split(",")

	if(vals[0] in trips):
		out.write(line)

out.close()
print('Extracted stop times')