function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function App() {
    const [fables, setFables] = React.useState([]);
    const [currentFable, setCurrentFable] = React.useState({})
    const [viewedFables, setViewedFables] = React.useState([])

    const setRandomFable = (data) => {
        let fablesData = []

        if (Array.isArray(data) && data[0].fable !== undefined && data[0].author !== undefined) {
            fablesData = data
        } else {
            fablesData = fables
        }

        if (data.type === "keydown" && !["ArrowLeft", "ArrowRight"].includes(data.key)) {
            return
        }

        if (data.type === "keydown" && data.key === "ArrowLeft") {
            if (viewedFables.length > 1) {
                const indexToJump = viewedFables[viewedFables.length - 2]
                setCurrentFable(fables[indexToJump])
                setViewedFables(viewedFables.slice(0, viewedFables.length - 1))
            }
            return
        }

        let index = 0

        do {
            index = getRandomInt(0, fablesData.length)
            if (viewedFables.length === fables.length) {
                setViewedFables([index])
                break
            }
            if (!viewedFables.includes(index)) {
                setViewedFables((viewedFables) => viewedFables.concat(index))
                break
            }
        } while (true)

        setCurrentFable(fablesData[index])
    }

    React.useEffect(async function () {
        try {
            const response = await fetch('./fables.json')
            const data = await response.json()
            setFables(data)
            setRandomFable(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    if (currentFable !== undefined) {
        return <>
            <div class="container" onClick={setRandomFable} tabIndex="0" onKeyDown={setRandomFable}>
                <div class="fable">
                    <p>{currentFable.fable}</p>
                </div>
                <div class="author">
                    <p>{currentFable.author}</p>
                </div>
            </div>
            <button onClick={setRandomFable}>Next</button>
        </>
    }
    return null
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
