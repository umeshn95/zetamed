import React from 'react'

const SelfTest = () => {
    // ✅ Updating properties in multiple objects
    const arr1 = [
        { id: 1, name: 'Alice' },
        { id: 1, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];
    const newArr = arr1.map(obj => {
        if (obj.id === 1) {
            return { ...obj, name: 'Alfred' };
        }

        return obj;
    });

    // 👇️ [
    //  {id: 1, name: 'Alfred'}, {id: 1, name: 'Alfred'}, {id: 3, name: 'Charlie}
    // ]
    console.log(newArr);
    return (
        <div>SelfTest</div>
    )
}

export default SelfTest