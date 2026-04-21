# FeedbackResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**doctor_id** | **int** |  | 
**patient_name** | **str** |  | 
**rating** | **int** |  | 
**comment** | **str** |  | 
**created_at** | **datetime** |  | [optional] 

## Example

```python
from openapi_client.models.feedback_response import FeedbackResponse

# TODO update the JSON string below
json = "{}"
# create an instance of FeedbackResponse from a JSON string
feedback_response_instance = FeedbackResponse.from_json(json)
# print the JSON string representation of the object
print(FeedbackResponse.to_json())

# convert the object into a dict
feedback_response_dict = feedback_response_instance.to_dict()
# create an instance of FeedbackResponse from a dict
feedback_response_from_dict = FeedbackResponse.from_dict(feedback_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


