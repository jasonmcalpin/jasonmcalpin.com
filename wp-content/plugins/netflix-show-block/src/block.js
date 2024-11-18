const { registerBlockType } = wp.blocks;
const { TextControl, Button, PanelBody, PanelRow } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { useState } = wp.element;

registerBlockType('nsb/netflix-show', {
    title: 'Netflix Show Block',
    icon: 'video-alt3',
    category: 'widgets',
    attributes: {
        showTitle: { type: 'string' },
        apiKey: { type: 'string' },
        showInfo: { type: 'object' },
    },

    edit: (props) => {
        const { attributes, setAttributes } = props;
        const [loading, setLoading] = useState(false);

        const fetchShowData = () => {
            setLoading(true);
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${attributes.apiKey}&query=${attributes.showTitle}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.results && data.results.length > 0) {
                        setAttributes({ showInfo: data.results[0] });
                    } else {
                        setAttributes({ showInfo: null });
                        alert('Show not found!');
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    alert('Error fetching data');
                });
        };

        return (
            <div className="netflix-show-block">
                <InspectorControls>
                    <PanelBody title="TMDb API Key">
                        <PanelRow>
                            <p>
                                Please enter your API Key from <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDb)</a> to access show information. In your account you find the API key under Settings.
                            </p>
                        </PanelRow>
                        <TextControl
                            label="TMDb API Key"
                            value={attributes.apiKey}
                            onChange={(value) => setAttributes({ apiKey: value })}
                        />
                    </PanelBody>
                    <PanelBody title="Show Title">
                        <PanelRow>
                            <p>
                                Enter the title of the show you want to display. This will be used to search for the show on TMDb.
                            </p>
                        </PanelRow>
                        <TextControl
                            label="Show Title"
                            value={attributes.showTitle}
                            onChange={(value) => setAttributes({ showTitle: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <Button className="fetch-button" isPrimary onClick={fetchShowData} disabled={loading || !attributes.apiKey}>
                    {loading ? 'Loading...' : 'Fetch Show Data'}
                </Button>
                {attributes.showInfo && (
                    <div className="show-info">
                        <img src={`https://image.tmdb.org/t/p/w200${attributes.showInfo.poster_path}`} alt={attributes.showInfo.name} />
                        <div className="show-details">
                            <h3>{attributes.showInfo.name}</h3>
                            <p>{attributes.showInfo.overview}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    },

    save: () => null,
});