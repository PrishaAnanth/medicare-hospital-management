# openapi_client.AppointmentsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**book_appointment_appointments_post**](AppointmentsApi.md#book_appointment_appointments_post) | **POST** /appointments/ | Book Appointment
[**cancel_appointment_appointments_id_delete**](AppointmentsApi.md#cancel_appointment_appointments_id_delete) | **DELETE** /appointments/{id} | Cancel Appointment
[**list_appointments_appointments_get**](AppointmentsApi.md#list_appointments_appointments_get) | **GET** /appointments/ | List Appointments
[**update_appointment_status_appointments_id_patch**](AppointmentsApi.md#update_appointment_status_appointments_id_patch) | **PATCH** /appointments/{id} | Update Appointment Status


# **book_appointment_appointments_post**
> AppointmentResponse book_appointment_appointments_post(appointment_create)

Book Appointment

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.appointment_create import AppointmentCreate
from openapi_client.models.appointment_response import AppointmentResponse
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
    api_instance = openapi_client.AppointmentsApi(api_client)
    appointment_create = openapi_client.AppointmentCreate() # AppointmentCreate | 

    try:
        # Book Appointment
        api_response = api_instance.book_appointment_appointments_post(appointment_create)
        print("The response of AppointmentsApi->book_appointment_appointments_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->book_appointment_appointments_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **appointment_create** | [**AppointmentCreate**](AppointmentCreate.md)|  | 

### Return type

[**AppointmentResponse**](AppointmentResponse.md)

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

# **cancel_appointment_appointments_id_delete**
> object cancel_appointment_appointments_id_delete(id)

Cancel Appointment

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
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
    api_instance = openapi_client.AppointmentsApi(api_client)
    id = 56 # int | 

    try:
        # Cancel Appointment
        api_response = api_instance.cancel_appointment_appointments_id_delete(id)
        print("The response of AppointmentsApi->cancel_appointment_appointments_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->cancel_appointment_appointments_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

**object**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_appointments_appointments_get**
> List[AppointmentResponse] list_appointments_appointments_get()

List Appointments

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.appointment_response import AppointmentResponse
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
    api_instance = openapi_client.AppointmentsApi(api_client)

    try:
        # List Appointments
        api_response = api_instance.list_appointments_appointments_get()
        print("The response of AppointmentsApi->list_appointments_appointments_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->list_appointments_appointments_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[AppointmentResponse]**](AppointmentResponse.md)

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

# **update_appointment_status_appointments_id_patch**
> AppointmentResponse update_appointment_status_appointments_id_patch(id, appointment_update)

Update Appointment Status

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.appointment_response import AppointmentResponse
from openapi_client.models.appointment_update import AppointmentUpdate
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
    api_instance = openapi_client.AppointmentsApi(api_client)
    id = 56 # int | 
    appointment_update = openapi_client.AppointmentUpdate() # AppointmentUpdate | 

    try:
        # Update Appointment Status
        api_response = api_instance.update_appointment_status_appointments_id_patch(id, appointment_update)
        print("The response of AppointmentsApi->update_appointment_status_appointments_id_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AppointmentsApi->update_appointment_status_appointments_id_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 
 **appointment_update** | [**AppointmentUpdate**](AppointmentUpdate.md)|  | 

### Return type

[**AppointmentResponse**](AppointmentResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

