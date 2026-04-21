# openapi_client.DoctorsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_doctor_doctors_post**](DoctorsApi.md#create_doctor_doctors_post) | **POST** /doctors/ | Create Doctor
[**get_doctor_booked_slots_doctors_id_booked_slots_get**](DoctorsApi.md#get_doctor_booked_slots_doctors_id_booked_slots_get) | **GET** /doctors/{id}/booked_slots | Get Doctor Booked Slots
[**get_doctors_doctors_get**](DoctorsApi.md#get_doctors_doctors_get) | **GET** /doctors/ | Get Doctors
[**get_my_doctor_profile_doctors_me_get**](DoctorsApi.md#get_my_doctor_profile_doctors_me_get) | **GET** /doctors/me | Get My Doctor Profile
[**update_doctor_availability_admin_doctors_id_patch**](DoctorsApi.md#update_doctor_availability_admin_doctors_id_patch) | **PATCH** /doctors/{id} | Update Doctor Availability Admin
[**update_my_doctor_profile_doctors_me_patch**](DoctorsApi.md#update_my_doctor_profile_doctors_me_patch) | **PATCH** /doctors/me | Update My Doctor Profile


# **create_doctor_doctors_post**
> DoctorResponse create_doctor_doctors_post(doctor_create)

Create Doctor

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.doctor_create import DoctorCreate
from openapi_client.models.doctor_response import DoctorResponse
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
    api_instance = openapi_client.DoctorsApi(api_client)
    doctor_create = openapi_client.DoctorCreate() # DoctorCreate | 

    try:
        # Create Doctor
        api_response = api_instance.create_doctor_doctors_post(doctor_create)
        print("The response of DoctorsApi->create_doctor_doctors_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->create_doctor_doctors_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **doctor_create** | [**DoctorCreate**](DoctorCreate.md)|  | 

### Return type

[**DoctorResponse**](DoctorResponse.md)

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

# **get_doctor_booked_slots_doctors_id_booked_slots_get**
> List[str] get_doctor_booked_slots_doctors_id_booked_slots_get(id, var_date)

Get Doctor Booked Slots

### Example


```python
import openapi_client
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
    api_instance = openapi_client.DoctorsApi(api_client)
    id = 56 # int | 
    var_date = 'var_date_example' # str | 

    try:
        # Get Doctor Booked Slots
        api_response = api_instance.get_doctor_booked_slots_doctors_id_booked_slots_get(id, var_date)
        print("The response of DoctorsApi->get_doctor_booked_slots_doctors_id_booked_slots_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->get_doctor_booked_slots_doctors_id_booked_slots_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 
 **var_date** | **str**|  | 

### Return type

**List[str]**

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

# **get_doctors_doctors_get**
> List[DoctorResponse] get_doctors_doctors_get()

Get Doctors

### Example


```python
import openapi_client
from openapi_client.models.doctor_response import DoctorResponse
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
    api_instance = openapi_client.DoctorsApi(api_client)

    try:
        # Get Doctors
        api_response = api_instance.get_doctors_doctors_get()
        print("The response of DoctorsApi->get_doctors_doctors_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->get_doctors_doctors_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[DoctorResponse]**](DoctorResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_my_doctor_profile_doctors_me_get**
> DoctorResponse get_my_doctor_profile_doctors_me_get()

Get My Doctor Profile

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.doctor_response import DoctorResponse
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
    api_instance = openapi_client.DoctorsApi(api_client)

    try:
        # Get My Doctor Profile
        api_response = api_instance.get_my_doctor_profile_doctors_me_get()
        print("The response of DoctorsApi->get_my_doctor_profile_doctors_me_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->get_my_doctor_profile_doctors_me_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**DoctorResponse**](DoctorResponse.md)

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

# **update_doctor_availability_admin_doctors_id_patch**
> DoctorResponse update_doctor_availability_admin_doctors_id_patch(id, doctor_update)

Update Doctor Availability Admin

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.doctor_response import DoctorResponse
from openapi_client.models.doctor_update import DoctorUpdate
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
    api_instance = openapi_client.DoctorsApi(api_client)
    id = 56 # int | 
    doctor_update = openapi_client.DoctorUpdate() # DoctorUpdate | 

    try:
        # Update Doctor Availability Admin
        api_response = api_instance.update_doctor_availability_admin_doctors_id_patch(id, doctor_update)
        print("The response of DoctorsApi->update_doctor_availability_admin_doctors_id_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->update_doctor_availability_admin_doctors_id_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 
 **doctor_update** | [**DoctorUpdate**](DoctorUpdate.md)|  | 

### Return type

[**DoctorResponse**](DoctorResponse.md)

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

# **update_my_doctor_profile_doctors_me_patch**
> DoctorResponse update_my_doctor_profile_doctors_me_patch(doctor_update)

Update My Doctor Profile

### Example

* OAuth Authentication (OAuth2PasswordBearer):

```python
import openapi_client
from openapi_client.models.doctor_response import DoctorResponse
from openapi_client.models.doctor_update import DoctorUpdate
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
    api_instance = openapi_client.DoctorsApi(api_client)
    doctor_update = openapi_client.DoctorUpdate() # DoctorUpdate | 

    try:
        # Update My Doctor Profile
        api_response = api_instance.update_my_doctor_profile_doctors_me_patch(doctor_update)
        print("The response of DoctorsApi->update_my_doctor_profile_doctors_me_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DoctorsApi->update_my_doctor_profile_doctors_me_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **doctor_update** | [**DoctorUpdate**](DoctorUpdate.md)|  | 

### Return type

[**DoctorResponse**](DoctorResponse.md)

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

