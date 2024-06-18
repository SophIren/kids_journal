import json
import yaml


def json_to_yaml(json_file_path, yaml_file_path):
    # Read the JSON file
    with open(json_file_path, 'r') as json_file:
        json_data = json.load(json_file)

    # Write the data to a YAML file
    with open(yaml_file_path, 'w') as yaml_file:
        yaml.dump(json_data, yaml_file, default_flow_style=False)


# Example usage
json_file_path = 'web/back/data.json'
yaml_file_path = 'web/back/data.yaml'
json_to_yaml(json_file_path, yaml_file_path)
