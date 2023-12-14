const App = () => {
    return (
        <div>
            <Person 
                age="18"
                hobbies={["Gardening", "Cooking"]}
                name="Jane"
            />
            <Person 
                age="21"
                hobbies={["Sleeping", "Giving up"]}
                name="Janice"
            />
            <Person 
                age="3"
                hobbies={["Crying", "Eating"]}
                name="Jen"
            />
        </div>  
    )
}