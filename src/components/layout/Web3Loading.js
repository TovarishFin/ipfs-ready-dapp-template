import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Page from './Page'
import Grid from '@material-ui/core/Grid'

const styles = {
  spinner: {
    paddingTop: '30vh',
    textAlign: 'center',
    width: '100%'
  }
}

const Loading = ({ classes }) => (
  <Page>
    <Grid align="center" container justify="center">
      <Grid item md={6} xs={12}>
        <CircularProgress
          color="secondary"
          className={classes.spinner}
          size={200}
          thickness={10}
        />
        <Typography variant="display1" color="secondary">
          web3 loading...
        </Typography>
      </Grid>
    </Grid>
  </Page>
)

export default withStyles(styles)(Loading)
