from .models import CarMake, CarModel


def populate():
    makes_data = [
        {'name': 'Toyota', 'description': 'Japanese automobile manufacturer'},
        {'name': 'Ford', 'description': 'American automobile manufacturer'},
        {'name': 'Honda', 'description': 'Japanese automobile manufacturer'},
        {'name': 'Chevrolet', 'description': 'American automobile manufacturer'},
        {'name': 'BMW', 'description': 'German luxury automobile manufacturer'},
    ]

    models_data = [
        {'make': 'Toyota', 'name': 'Camry', 'type': 'Sedan', 'year': 2022},
        {'make': 'Toyota', 'name': 'RAV4', 'type': 'SUV', 'year': 2023},
        {'make': 'Toyota', 'name': 'Highlander', 'type': 'SUV', 'year': 2023},
        {'make': 'Ford', 'name': 'Mustang', 'type': 'Coupe', 'year': 2023},
        {'make': 'Ford', 'name': 'Explorer', 'type': 'SUV', 'year': 2022},
        {'make': 'Ford', 'name': 'F-150', 'type': 'Truck', 'year': 2023},
        {'make': 'Honda', 'name': 'Civic', 'type': 'Sedan', 'year': 2023},
        {'make': 'Honda', 'name': 'CR-V', 'type': 'SUV', 'year': 2022},
        {'make': 'Chevrolet', 'name': 'Malibu', 'type': 'Sedan', 'year': 2022},
        {'make': 'Chevrolet', 'name': 'Tahoe', 'type': 'SUV', 'year': 2023},
        {'make': 'BMW', 'name': '3 Series', 'type': 'Sedan', 'year': 2023},
        {'make': 'BMW', 'name': 'X5', 'type': 'SUV', 'year': 2023},
    ]

    for m in makes_data:
        CarMake.objects.get_or_create(name=m['name'], defaults={'description': m['description']})

    for m in models_data:
        make = CarMake.objects.get(name=m['make'])
        CarModel.objects.get_or_create(
            name=m['name'],
            car_make=make,
            defaults={'car_type': m['type'], 'year': m['year']}
        )

    print('Database populated successfully.')
