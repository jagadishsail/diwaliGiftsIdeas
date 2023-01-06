import React, { useState } from 'react'
import Head from 'next/head';
import styles from './index.module.css';
export default function Home() {
    const [gender, setGender] = useState('man');
    const [age, setAge] = useState(30);
    const [hobbies, setHobbies] = useState('');
    const [priceMin, setPriceMin] = useState(25);
    const [priceMax, setPriceMax] = useState(200);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    async function onSubmit(event) {
        event.preventDefault();
        if(loading){
            return;
        }
        setLoading(true);
        setResult('');

        const response = await fetch('api/generate-gifts',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({priceMin, priceMax, gender, age, hobbies})
        });

        const data = await response.json();
        setResult(data.result.replaceAll('\n', '<br />'));
        setLoading(false);

    }

    return (
        <div>
            <Head>
                <title>OpenAI Quickstart</title>
                <link rel='icon' href='/dog.png'></link>
            </Head>
            <main className='styles.main'>
                <h3>Diwali Gifts Generator</h3>
                <form onSubmit={onSubmit}>
                    <label>For who is this gift?</label>
                    <select
                        name='gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="man">Man</option>
                        <option value="woman">Woman</option>
                        
                    </select>
                    
                    <label>Age</label>
                    <input
                        type="number"
                        min={1}
                        max={99}
                        placeholder="Enter the age"
                        value={age}
                        onChange={(e) => setAge(Number.parseInt(e.target.value))}
                    >
                    </input>

                    <label>Price From</label>
                    <input
                        type="number"
                        min={1}
                        name="priceMin"
                        placeholder="Enter the minimum price"
                        value={priceMin}
                        onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
                    >
                    </input>
                    
                    <label>Price to</label>
                    <input
                        type="number"
                        name="priceMax"
                        min={1}
                        placeholder="Enter the maximum price"
                        value={priceMax}
                        onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
                    >
                    </input>
                    
                    <label>Hobbies</label>
                    <input
                        type="text"
                        name="hobbies"
                        placeholder="Enter the hobbies"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                    >
                    </input>
                    <br/>
                    <input type="submit" value="Generate Diwali gift ideas" />
                </form>

                {
                    loading && (
                        <div>
                            <h3>Looking for the best gift ideas</h3>
                            <img src='/loading.gif' className={styles.loading}></img>
                        </div>
                    )
                }
                <div
                    className={styles.result}
                    dangerouslySetInnerHTML={{__html: result}}>

                </div>
            </main>
        </div>
    )
}
