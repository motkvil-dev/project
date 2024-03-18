import { useEffect, useState } from 'react'
import './App.css'
import { Box, Grid, Rating, Stack } from '@mui/material'
import axios from 'axios'

function App() {
  const [books, setBooks] = useState()
  const [formOption, setFormOption] = useState('title')


  const getBook = async (title) => {
    let url = ('?title=it')
    console.log(url)
    let data = await (await fetch('https://openlibrary.org/search.json' + url)).json()
    console.log(data.docs)
    setBooks(data.docs)
  }

  const setFormOptionFunction = (prop) => {
    setFormOption(prop)
  }


  useEffect(()=>{
    getBook()
  },[])

  return (
    <Box>

      <Box
        className='title'
        bgcolor={'black'}
        color={'white'}
        fontSize={40}
        padding={2}
        marginBottom={1}
      >
        
        Lectuland
        
      </Box>

      <Box
        display={'flex'}
        padding={1}
        justifyContent={'center'}
      >
        
        <Box>
          <form action="" className='form'>
            <input placeholder={'By '+formOption} type="text" className='input'/>
          </form>
        </Box>

        <Box
          className='title'
          bgcolor={'hsla(0,0%,0%)'}
          onClick={()=>getBook()}
          color={'white'}
          style={{borderTopRightRadius:'5px',borderBottomRightRadius:'5px'}}
          padding={1}
        >
          Search
        </Box>
      </Box>

      <Box
        display={'flex'}
        justifyContent={'center'}
      >
        <Box
          bgcolor={formOption === 'title'?'black':'white'}
          color={formOption === 'title'?'white':'gray'}
          onClick={()=>setFormOptionFunction('title')}
          style={{cursor:'pointer'}}
          className='title'
          borderRadius={1}
          marginRight={1}
          p={1}
        >
          Title
        </Box>
        <Box
          bgcolor={formOption === 'author'?'black':'white'}
          color={formOption === 'author'?'white':'gray'}
          onClick={()=>setFormOptionFunction('author')}
          style={{cursor:'pointer'}}
          className='title'
          borderRadius={1}
          p={1}
        >
          Author
        </Box>
        <Box>

        </Box>
      </Box>

      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box padding={2} maxWidth={1000}>


          <Grid
            container
          >
            {
              books?books.map((item,index)=>(
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  >
                  <Box
                    padding={1}
                    margin={.4}
                    bgcolor={'white'}
                    borderRadius={2}
                    paddingBottom={2}
                    paddingTop={2}
                    boxShadow={'inset 0px 1px 5px gray'}
                  >
                    <Box
                      fontSize={10}
                      className='title'
                    >
                      <Stack>
                        <Rating 
                          defaultValue={item.ratings_average}
                        />
                        <h1>{item.title}</h1>
                        <h3>{item.author_name}</h3> 
                      </Stack>
                      
                    </Box>


                    <Box 
                    >
                    </Box>
                  </Box>
                </Grid>
              ))
              
              :
              
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                textAlign={'center'}
              >
                Loading...
              </Box>
            }

            {
              books?books.length==0?
                <Box
                  width={'100%'}
                  textAlign={'center'}
                  paddingTop={3}
                  color={'gray'}
                  alignContent={'center'}

                >
                  No hay resultados
                </Box>
                :undefined
              :undefined
            }
          </Grid>
        </Box>
      </Box>

    </Box>
  )
}

export default App
