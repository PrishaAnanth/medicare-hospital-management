# openapi_client.FeedbacksApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_doctor_feedbacks_feedbacks_doctor_id_get**](FeedbacksApi.md#get_doctor_feedbacks_feedbacks_doctor_id_get) | **GET** /feedbacks/{doctor_id} | Get Doctor Feedbacks
[**leave_feedback_feedbacks_post**](FeedbacksApi.md#leave_feedback_feedbacks_post) | **POST** /feedbacks/ | Leave Feedback
[**list_feedbacks_feedbacks_get**](FeedbacksApi.md#list_feedbacks_feedbacks_get) | **GET** /feedbacks/ | List Feedbacks


# **get_doctor_feedbacks_feedbacks_doctor_id_get**
> List[FeedbackResponse] get_doctor_feedbacks_feedbacks_doctor_id_get(doctor_id)

Get Doctor Feedbacks

### Example


```python
import openapi_client
from openapi_client.models.feedback_response import FeedbackResponse
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.FeedbacksApi(api_client)
    doctor_id = 56 # int | 

    try:
        # Get Doctor Feedbacks
        api_response = api_instance.get_doctor_feedbacks_feedbacks_doctor_id_get(doctor_id)
        print("The response of FeedbacksApi->get_doctor_feedbacks_feedbacks_doctor_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FeedbacksApi->get_doctor_feedbacks_feedbacks_doctor_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **doctor_id** | **int**|  | 

### Return type

[**List[FeedbackResponse]**](FeedbackResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **leave_feedback_feedbacks_post**
> FeedbackResponse leave_feedback_feedbacks_post(feedback_create)

Leave Feedback

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.feedback_create import FeedbackCreate
from openapi_client.models.feedback_response import FeedbackResponse
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.FeedbacksApi(api_client)
    feedback_create = openapi_client.FeedbackCreate() # FeedbackCreate | 

    try:
        # Leave Feedback
        api_response = api_instance.leave_feedback_feedbacks_post(feedback_create)
        print("The response of FeedbacksApi->leave_feedback_feedbacks_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FeedbacksApi->leave_feedback_feedbacks_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **feedback_create** | [**FeedbackCreate**](FeedbackCreate.md)|  | 

### Return type

[**FeedbackResponse**](FeedbackResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_feedbacks_feedbacks_get**
> List[FeedbackResponse] list_feedbacks_feedbacks_get()

List Feedbacks

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.feedback_response import FeedbackResponse
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

configuration.access_token = os.environ["ACCESS_TOKEN"]

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.FeedbacksApi(api_client)

    try:
        # List Feedbacks
        api_response = api_instance.list_feedbacks_feedbacks_get()
        print("The response of FeedbacksApi->list_feedbacks_feedbacks_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FeedbacksApi->list_feedbacks_feedbacks_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[FeedbackResponse]**](FeedbackResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

