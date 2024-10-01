"use client"
import { Button } from '@/components/catalyst/button'
import { ErrorMessage, Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const doLogin = () => {
        localStorage.setItem('userid', id);
        localStorage.setItem('username', name);
        // router.push('/inbox');
    }

    return (
        <div>
            <Field>
                <Label>Id</Label>
                <Input name="id" value={id}  onChange={(e) => { setId(e.target.value) }}/>
            </Field>
            <Field>
                <Label>Name</Label>
                <Input name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </Field>
            <Button onClick={doLogin}>Login</Button>
        </div>
    )
}

export default LoginPage;


