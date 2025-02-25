package api

// check InstanceCreate
// ref: https://github.com/bytebase/bytebase/blob/cf5e0927a91c0c52ace4ff141c69875c2aa679c3/frontend/src/types/instance.ts#L91
type Instance struct {
	// Related fields
	EnvironmentID string `json:"environmentId"`
	// Domain specific fields
	Name         string     `json:"name"`
	Engine       EngineType `json:"engine"`
	Host         string     `json:"host"`
	ExternalLink string     `json:"externalLink,omitempty"`
	Port         string     `json:"port,omitempty"`
	Username     string     `json:"username"`
	Password     string     `json:"password"`
}

// InstanceMessage is the API message for an instance.
type InstanceMessage struct {
	UID          string               `json:"uid"`
	Name         string               `json:"name"`
	State        State                `json:"state,omitempty"`
	Title        string               `json:"title"`
	Engine       EngineType           `json:"engine"`
	ExternalLink string               `json:"externalLink"`
	DataSources  []*DataSourceMessage `json:"dataSources"`
}

// InstancePatchMessage is the API message to patch the instance.
type InstancePatchMessage struct {
	Title        *string              `json:"title,omitempty"`
	ExternalLink *string              `json:"externalLink,omitempty"`
	DataSources  []*DataSourceMessage `json:"dataSources,omitempty"`
}

// InstanceFindMessage is the API message for finding instance.
type InstanceFindMessage struct {
	EnvironmentID string
	InstanceID    string
	ShowDeleted   bool
}

// ListInstanceMessage is the API message for list instance response.
type ListInstanceMessage struct {
	Instances     []*InstanceMessage `json:"instances"`
	NextPageToken string             `json:"nextPageToken"`
}
