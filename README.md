# kaholo-plugin-github
Github plugin for Kaholo.
This plugin is used to integrate with Github using it's REST API. You can see it's documentation [here](https://docs.github.com/en/rest).

## Settings
1. Authentication Token (Vault) **Optional** - The OAuth token of the default user to authenticate with. You can see more information on creating tokens [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

* **Please Notice!** For almost all actions you have to provide an authentication token, either from the setiings or inside the action.

## Method: Create Commit Status
Create a new commit status. You can see more on guthub commit statuses [here](https://docs.github.com/en/rest/reference/repos#statuses).

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Owner (Autocomplete) **Optional** - The owner of the repository to send a commit status about. Default value is the authenticated user.
3. Repository (Autocomplete) **Required** - The repository of the commit to send a status check about.
4. Branch (Autocomplete) **Optional** - The brnach of the commit to send a status check about.
5. Commit (Autocomplete) **Required** - The commit to send a status check about.
6. State (Options) **Required** - The state of the status check. Possible values: Error | Failure | Pending | Success
7. Linked Target URL (String) **Optional** -  A URL link to a report of the status check in case there is one.
8. Description (Text) **Optional** - A short description of the status check results.
9. Context (String) **Optional** - A label to differentiate this status from the status of other systems. This field is case-insensitive. Default value is 'default'.

## Method: Create New Repository
Create a new repository.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Repository Name (String) **Required** - The name of the new repository to create.
3. Description (Text) **Optional** - Description of the new repository.
4. Owner (Autocomplete) **Optional** - The owner of the new repository. Can be either the authenticated user or any of it's conneceted organizations. Default value is the authenticated user.
5. Private (Boolean) **Optional** - If specified, the repository will be private(Only users with access to repos of the owner will be able to access them). Default value is false.
6. Auto Init (Boolean) **Optional** - If true, create an initial commit with empty README. Default value is false.
7. GitIgnore Template (String) **Optional** - Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".

## Method: Create Repository From Template
Create a new repository from a template repository.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Template Repository Full Name (String) **Required** - The name of the template repository to use to generate the new repository.
3. New Repository Name (String) **Required** - The name of the new repository to create.
4. Description (Text) **Optional** - Description of the new repository.
5. New Repository Owner (Autocomplete) **Optional** - The owner of the new repository. Can be either the authenticated user or any of it's conneceted organizations. Default value is the authenticated user.
6. Private (Boolean) **Optional** - If specified, the repository will be private(Only users with access to repos of the owner will be able to access them). Default value is false.

## Method: Create Repository Webhook
Create a repository webhook for the specified repository.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Owner (Autocomplete) **Optional** - The owner of the repository to create the webhook for.
3. Repository (Autocomplete) **Required** - The repository to create the webhook for.
4. Subcribed Events (Text) **Optional** - The events to subscribe to with the webhook.
5. Webhook URL (String) **Required** - The URL to send all requests to the webhook to.
6. Webhook Content Type (Options) **Optional** - The format to send the content of the evemts in. Possible values: Json | Form
7. Secret (Vault) **Optional** - If specified, include the specified secret as the HMAC key for verification.
8. Don't Verify SSL (Boolean) **Optional** - If specified, don't verify the SSL certificate of the webhook when sending requests. **Not Recomneded**
9. Not Active (Boolean) **Optional** - If specified, create the webhook in un-active mode. Github doesn't send requests to webhooks as long as they are not active.

## Method: List Conneceted Organizations
List the organizations connected to the authenticated user.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Results Per Page (String) **Optional** - Maximum number of results to return. Maximum possible value is 100. Default is 30.
3. Page Index (String) **Optional** - The index of the page of results to return. Default value is 0.

## Method: List Available Repositories
List all available repositories of the specified owner.

### Parameters
1. Authentication Token (Vault) **Optional** -  The OAuth token of the user to authenticate with.
2. Owner (Autocomplete) **Optional** - Returns results only of the specified owner. Default value is the authenticated user.
3. Results Per Page (String) **Optional** - Maximum number of results to return. Maximum possible value is 100. Default is 30.
4. Page Index (String) **Optional** - The index of the page of results to return. Default value is 0.

## Method: List Branches
List branches of the specified repository.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Owner (Autocomplete) **Optional** - The owner of the repository to list it's branches. Default value is the authenticated user
3. Repository (Autocomplete) **Required** - The repository to list it's branches.
4. Results Per Page (String) **Optional** - Maximum number of results to return. Maximum possible value is 100. Default is 30.
5. Page Index (String) **Optional** - The index of the page of results to return. Default value is 0.

## Method: List Commits
List all commits and their SHA, of the specified repository, and possibly branch inside the repository.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with.
2. Owner (Autocomplete) **Optional** - The owner of the repository. Default value is the authenticated user.
3. Repository (Autocomplete) **Required** - The repository to list it's commits.
4. Branch (Autocomplete) **Optional** - If specified, return only results from the specified branch.
5. Results Per Page (String) **Optional** - Maximum number of results to return. Maximum possible value is 100. Default is 30.
6. Page Index (String) **Optional** - The index of the page of results to return. Default value is 0.

## Method: Get Authenticated User
Get Authenticated User

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with and return the info on.

## Method: Get Repository
Get information on the specified repository.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with and return the info on.
2. Owner (Autocomplete) **Optional** - The owner of the repository. Default value is the authenticated user.
3. Repository (Autocomplete) **Required** - The repository to return information about.

## Method: Get Pull Request
Get information on the specified pull request.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with and return the info on.
2. Owner (Autocomplete) **Optional** - The owner of the repository. Default value is the authenticated user.
3. Repository (Autocomplete) **Required For Pull Request Dropdown** - The repository of the pull request. Needed in case choosing the pull request from the dropdown menu in the UI. Not required in case of providing the Pull request by URL.
4. Pull Request (Autocomplete) **Required** - The pull request to return information about. Can also be provided by the URL of the pull request or it's related issue.

## Method: Post Comment On Pull Request
Post a comment on the specified pull request.

### Parameters
1. Authentication Token (Vault) **Optional** - The OAuth token of the user to authenticate with and return the info on.
2. Owner (Autocomplete) **Optional** - The owner of the repository. Default value is the authenticated user.
3. Repository (Autocomplete) **Required For Pull Request Dropdown** - The repository of the pull request. Needed in case choosing the pull request from the dropdown menu in the UI. Not required in case of providing the Pull request by URL.
4. Pull Request (Autocomplete) **Required** - The pull request to post the comment on. Can also be provided by the URL of the pull request or it's related issue, or with the 'comments_url' field of the pull request.
5. Comment (Text) **Required** - The content of the comment to post on the pull request.