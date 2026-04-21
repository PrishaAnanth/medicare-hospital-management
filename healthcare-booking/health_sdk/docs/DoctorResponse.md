# DoctorResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**specialization** | **str** |  | 
**start_hour** | **int** |  | 
**end_hour** | **int** |  | 
**is_available** | **bool** |  | 
**gender** | **str** |  | 
**user_id** | **int** |  | [optional] 

## Example

```python
from openapi_client.models.doctor_response import DoctorResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DoctorResponse from a JSON string
doctor_response_instance = DoctorResponse.from_json(json)
# print the JSON string representation of the object
print(DoctorResponse.to_json())

# convert the object into a dict
doctor_response_dict = doctor_response_instance.to_dict()
# create an instance of DoctorResponse from a dict
doctor_response_from_dict = DoctorResponse.from_dict(doctor_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


