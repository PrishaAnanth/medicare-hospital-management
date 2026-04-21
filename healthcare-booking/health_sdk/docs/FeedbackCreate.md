# FeedbackCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**doctor_id** | **int** |  | 
**rating** | **int** |  | 
**comment** | **str** |  | 

## Example

```python
from openapi_client.models.feedback_create import FeedbackCreate

# TODO update the JSON string below
json = "{}"
# create an instance of FeedbackCreate from a JSON string
feedback_create_instance = FeedbackCreate.from_json(json)
# print the JSON string representation of the object
print(FeedbackCreate.to_json())

# convert the object into a dict
feedback_create_dict = feedback_create_instance.to_dict()
# create an instance of FeedbackCreate from a dict
feedback_create_from_dict = FeedbackCreate.from_dict(feedback_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


