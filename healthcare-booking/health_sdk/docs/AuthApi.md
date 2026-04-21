# openapi_client.AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**login_auth_login_post**](AuthApi.md#login_auth_login_post) | **POST** /auth/login | Login
[**register_auth_register_post**](AuthApi.md#register_auth_register_post) | **POST** /auth/register | Register


# **login_auth_login_post**
> Token login_auth_login_post(user_login)

Login

### Example


```python
import openapi_client
from openapi_client.models.token import Token
from openapi_client.models.user_login import UserLogin
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
    api_instance = openapi_client.AuthApi(api_client)
    user_login = openapi_client.UserLogin() # UserLogin | 

    try:
        # Login
        api_response = api_instance.login_auth_login_post(user_login)
        print("The response of AuthApi->login_auth_login_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AuthApi->login_auth_login_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_login** | [**UserLogin**](UserLogin.md)|  | 

### Return type

[**Token**](Token.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **register_auth_register_post**
> Token register_auth_register_post(user_create)

Register

### Example


```python
import openapi_client
from openapi_client.models.token import Token
from openapi_client.models.user_create import UserCreate
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
    api_instance = openapi_client.AuthApi(api_client)
    user_create = openapi_client.UserCreate() # UserCreate | 

    try:
        # Register
        api_response = api_instance.register_auth_register_post(user_create)
        print("The response of AuthApi->register_auth_register_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AuthApi->register_auth_register_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user_create** | [**UserCreate**](UserCreate.md)|  | 

### Return type

[**Token**](Token.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

